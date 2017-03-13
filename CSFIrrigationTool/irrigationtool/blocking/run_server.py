#!/usr/bin/env python

import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.escape import json_encode

import datetime
import numpy as np
import h5py
import os

from tornado.options import define, options
define("port", default=20005, help="run on the given port", type=int)

class DataHdf5Handler(tornado.web.RequestHandler):
	def get(self):
		# location of data server
		dir_data_server = '/app_data/irrigation'

		# input from browser
		lat = float( self.get_argument('lat', '42.5') )
		lon = float( self.get_argument('lon', '-76.5') )

		# find indices of lat/lon
		lat0 = 37. + 4./24.
		lon0 = -83. + 7./24.
		idxLat = int( round( 24.*(lat-lat0) ) )
		idxLon = int( round( 24.*(lon-lon0) ) )

		#Load Precip data for current year
		dir_precip = dir_data_server + '/acis_precip/hdf5/'
		h5file = h5py.File(dir_precip+'acis_pcpn.h5','r')
		data_precip = h5file['precip'][:,idxLat,idxLon]
		dates_precip = h5file['dates'][:]
		h5file.close()

		#Load Precip forecast data for current year
		dir_precip_fcst = dir_data_server + '/ndfd_qpf/hdf5/'
		h5file = h5py.File(dir_precip_fcst+'qpf_fcst.h5','r')
		data_precip_fcst = h5file['qpf'][:,idxLat,idxLon]
		dates_precip_fcst = h5file['dates'][:]
		h5file.close()

		#Load PET data for current year
		dir_pet = dir_data_server + '/nrcc_pet/hdf5/'
		h5file = h5py.File(dir_pet+'dpet.h5','r')
		data_pet = h5file['pet'][:,idxLat,idxLon]
		dates_pet = h5file['dates'][:]
		h5file.close()

		#Load PET forecast data for current year
		dir_pet_fcst = dir_data_server + '/nrcc_pet_fcst/hdf5/'
		h5file = h5py.File(dir_pet_fcst+'dpet.h5','r')
		data_pet_fcst = h5file['pet'][:,idxLat,idxLon]
		dates_pet_fcst = h5file['dates'][:]
		h5file.close()

		# Use only dates in intersection of PET and Precip lists.
		# This is an issue when one of the obs is available before the other, so the list lengths and dates differ
		dateDiffs = set(dates_pet).symmetric_difference(set(dates_precip))
		pet_idxToRemove = [list(dates_pet).index(x) for x in dateDiffs if x in dates_pet]
		precip_idxToRemove = [list(dates_precip).index(x) for x in dateDiffs if x in dates_precip]
		print 'removing pet indices:',pet_idxToRemove
		print 'removing precip indices:',precip_idxToRemove
		# delete extra dates ...
		dates_pet = np.delete(dates_pet,pet_idxToRemove)
		dates_precip = np.delete(dates_precip,precip_idxToRemove)
		# delete extra data ...
		data_pet = np.delete(data_pet,pet_idxToRemove,axis=0)
		data_precip = np.delete(data_precip,precip_idxToRemove,axis=0)
		print 'length of pet:',data_pet.shape,len(dates_pet)
		print 'length of precip:',data_precip.shape,len(dates_precip)

		# first obs date
		# uncomment to go live March 1. Keep as is to view last year's data.
		#first_date = dates_precip[0][-5:].replace('_','/') + "/" + str(datetime.date.today().year)
		first_date = dates_precip[0][-5:].replace('_','/') + "/" + str(datetime.date.today().year-1)
		#first_date = dates_precip[0][-5:].replace('_','/') + "/" + dates_precip[0][0:4].replace('_','/')

		# last obs date
		lastObsDate = dates_pet[-1]

		# Use only dates in intersection of PET and Precip Forecast lists.
		dateDiffs = set(dates_pet_fcst).symmetric_difference(set(dates_precip_fcst))
		pet_fcst_idxToRemove = [list(dates_pet_fcst).index(x) for x in dateDiffs if x in dates_pet_fcst]
		precip_fcst_idxToRemove = [list(dates_precip_fcst).index(x) for x in dateDiffs if x in dates_precip_fcst]
		# delete extra dates ...
		dates_pet_fcst = np.delete(dates_pet_fcst,pet_fcst_idxToRemove)
		dates_precip_fcst = np.delete(dates_precip_fcst,precip_fcst_idxToRemove)
		# delete extra data ...
		data_pet_fcst = np.delete(data_pet_fcst,pet_fcst_idxToRemove,axis=0)
		data_precip_fcst = np.delete(data_precip_fcst,precip_fcst_idxToRemove,axis=0)

		# delete forecast data that occurs before last day of obs
		if lastObsDate in dates_pet_fcst:
			pet_fcst_lastObsIdx = list(dates_pet_fcst).index(lastObsDate)
			dates_pet_fcst = np.delete(dates_pet_fcst,range(0,pet_fcst_lastObsIdx+1))
			data_pet_fcst = np.delete(data_pet_fcst,range(0,pet_fcst_lastObsIdx+1),axis=0)
		else:
			pass
			#dates_pet_fcst = np.array([])
			#data_pet_fcst = np.array([])

		if lastObsDate in dates_precip_fcst:
			precip_fcst_lastObsIdx = list(dates_precip_fcst).index(lastObsDate)
			dates_precip_fcst = np.delete(dates_precip_fcst,range(0,precip_fcst_lastObsIdx+1))
			data_precip_fcst = np.delete(data_precip_fcst,range(0,precip_fcst_lastObsIdx+1),axis=0)
		else:
			pass
			#dates_precip_fcst = np.array([])
			#data_precip_fcst = np.array([])

		# create response and send as JSONP
		response_json = {
			'lat': str(lat),
			'lon': str(lon),
                        'first_date': first_date,
			'dates_pet': dates_pet.tolist(),
			'pet': data_pet.tolist(),
			'dates_precip': dates_precip.tolist(),
			'precip': data_precip.tolist(),
			'dates_pet_fcst': dates_pet_fcst.tolist(),
			'pet_fcst': data_pet_fcst.tolist(),
			'dates_precip_fcst': dates_precip_fcst.tolist(),
			'precip_fcst': data_precip_fcst.tolist(),
			}

		callback = self.get_argument('callback')
		response_jsonp = "{jsfunc}({json});".format(jsfunc=callback, json=json_encode(response_json))
		self.set_header('Content-Type', 'application/javascript')
		self.write(response_jsonp)

class ClimHandler(tornado.web.RequestHandler):
	def get(self):
		# location of data
		dir_data_server = '/app_data/irrigation'

                # var definitions
		miss = -999
		startYear = 2002
		endYear = datetime.date.today().year - 1
		#endYear = 2015

		# input from browser
		lat = float( self.get_argument('lat', '42.5') )
		lon = float( self.get_argument('lon', '-76.5') )

		# find indices of lat/lon
		lat0 = 37. + 4./24.
		lon0 = -83. + 7./24.
		idxLat = int( round( 24.*(lat-lat0) ) )
		idxLon = int( round( 24.*(lon-lon0) ) )

		#Load PET data for selected months and location, each year
		dir_pet = dir_data_server + '/clim_pet/hdf5/'
		h5file = h5py.File(dir_pet+'dpet.h5','r')
		data_pet_point = h5file['pet'][:,:,idxLat,idxLon].tolist()
		h5file.close()

		#Load Precip data for selected months and location, each year
		dir_precip = dir_data_server + '/clim_precip/hdf5/'
		h5file = h5py.File(dir_precip+'acis_precip.h5','r')
		data_precip_point = h5file['precip'][:,:,idxLat,idxLon].tolist()
		h5file.close()

		# create response and send as JSONP
		response_json = {
			'lat': str(lat),
			'lon': str(lon),
			'pet_clim': data_pet_point,
			'precip_clim': data_precip_point,
			}

		callback = self.get_argument('callback')
		response_jsonp = "{jsfunc}({json});".format(jsfunc=callback, json=json_encode(response_json))
		self.set_header('Content-Type', 'application/javascript')
		self.write(response_jsonp)

if __name__ == "__main__":
	tornado.options.parse_command_line()
	app = tornado.web.Application(handlers=[
		(r"/irrigationtool/datahdf5", DataHdf5Handler),
		(r"/irrigationtool/datahdf5/", DataHdf5Handler),
		(r"/irrigationtool/clim", ClimHandler),
		(r"/irrigationtool/clim/", ClimHandler),
		(r"/(.*)", tornado.web.StaticFileHandler, {"path": "/opt/tool_pkg"}),
		])
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()

