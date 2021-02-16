#!/bin/bash

max=86
for i in `seq 2 $max`
do
    t=v0.3.$i
    git tag -d $t
    git push origin :refs/tags/$t
done