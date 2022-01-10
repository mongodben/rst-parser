#! /bin/bash

# script to download whole realm site locally
# may take a while...
httrack "https://docs.mongodb.com/realm/" -O "realm-site" "+*docs.mongodb.com/realm/*" -v
