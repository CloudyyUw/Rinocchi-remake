#!/bin/sh

echo "Params?"
read args

node ./custom_exec.js --args:"$args"

echo "End"
