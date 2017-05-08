/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

export const ComfirmButton = (props)=>(
    <Button bsSize="large" onClick={ props.onMyClick } id="primaryButton" block active>{props.content}</Button>
);

