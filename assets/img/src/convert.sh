#!/bin/sh

# https://github.com/google/guetzli

PATH_HOME=/home/ubuntu/workspace
PATH_IMG=$PATH_HOME/assets/img
PATH_SRC=$PATH_IMG/src
PATH_DEST1=$PATH_IMG/
# PATH_DEST2=$PATH_IMG/optimized2
PATH_PGM1=$PATH_HOME/guetzli/bin/Release/guetzli
# PATH_PGM2_HOME=$PATH_HOME/jpegtran
# PATH_PGM2=$PATH_PGM2_HOME/jpegtran

TIME="Time taken: %E  CPU total: %P   CPU system: %Ss   CPU user: %Us   Memory max:  %M Kb"
PGM_TIME='/usr/bin/time'
SIZE="du -b"

mkdir -p $PATH_DEST1
# mkdir -p $PATH_DEST2



for SRC in $PATH_SRC/*; do
  DIR=$(dirname "$SRC")
  NAME=$(basename "$SRC")
  DEST1=$PATH_DEST1/$NAME
  # DEST2=$PATH_DEST2/$NAME

  if [ ! -f $DEST1 ]; then
    echo "**** Guetzli $NAME ****"
    $SIZE $SRC
    TIME="$TIME" $PGM_TIME $PATH_PGM1 --nomemlimit $SRC $DEST1
    $SIZE $DEST1
    echo ""
  fi

  # if [ ! -f $DEST2 ]; then
  #   echo "**** jpegtran  $SRC --> $DEST2 ****"
  #   $SIZE $SRC
  #   $PGM_TIME $PATH_PGM2 -copy none -optimize -perfect -outfile $DEST2 $SRC
  #   $SIZE $DEST2
  # fi

  # echo ""
done

