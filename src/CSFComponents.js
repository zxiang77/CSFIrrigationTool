/**
 * Created by zilixiang on 4/7/17.
 */
import React, { Component } from 'react';
import {ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap'

export const ComfirmButton = (props)=>(
    <Button bsSize="large" id="primaryButton" block active>{props.content}</Button>
);

