#!/usr/bin/env bash

app_to_test=$1
no_report=$2

# go to project base folder and clear terminal 
cd ./application
clear

# run all tests
if [ -z "$app_to_test" ]; then 
  echo 'starting tests'
  coverage run manage.py test
  
# run test for the app provided
else                               
  echo -e "testing ${app_to_test}" 
  coverage run --source=./$app_to_test manage.py test $app_to_test 
fi

# delete games images created on tests
rm -rf media/games
[ -z "$no_report" ] && coverage report -m

# go back to server folder
cd ..
