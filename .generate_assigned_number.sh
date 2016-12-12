#!/bin/bash
name=$(whoami)
echo $name "your code is:"
LC_CTYPE=C printf '%d' "'$name"
echo ""

