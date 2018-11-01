for FILE in *-thumb.jpg
do
	cp $FILE ${FILE%%.*}-thumb.jpg
	#sips --resampleWidth 225 $FILE
done
