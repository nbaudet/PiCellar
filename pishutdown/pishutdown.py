#!/usr/bin/env python2.7
# Inspired by Alex Eames @ raspi.tv
# http://raspi.tv/2013/how-to-use-interrupts-with-python-on-the-raspberry-pi-and-rpi-gpio
import RPi.GPIO as GPIO
import os

GPIO.setmode(GPIO.BCM)

# Setup input on pin 7
PIN = 7
GPIO.setup(PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("Waiting for falling edge on pin 7")

try:
	GPIO.wait_for_edge(PIN, GPIO.FALLING)
	print("Falling edge detected. Shutdown initiated.")
	os.system("sudo shutdown -h now")

except KeyboardInterrupt:
	GPIO.cleanup() # Clean up GPIO on Ctrl+C exit
GPIO.cleanup()         # Clean up GPIO on normal exit

