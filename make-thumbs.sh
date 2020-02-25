for file in *.jpg; do
	echo $file
	cp "$file" ./"${file%%.*}-thumb.jpg"
done


for file in *-thumb.jpg; do
	convert $file -resize 310x310^ -gravity center -extent 310x310 $file
done

