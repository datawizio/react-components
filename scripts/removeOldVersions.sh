#!/bin/bash

max=12
for i in `seq 1 $max`
do
    t=v0.2.$i
    git tag -d $t
    git push origin :refs/tags/$t
done