# Stepper Motor Control for ClearBlade

This python code will allow you to control a stepper motor on a raspberry pi. The code may need to be adapted for your specfic stepper motor controller and pin output.

Publish messages to "motor/angle"
Example Message:
{"controlState":"CCW","state":"3450"}
 *controlState: 
  *CCW will turn the motor Counter Clockwise
  *CW will turn the motor Clockwise
 *state: 
  *determines how many rotations the motor will turn