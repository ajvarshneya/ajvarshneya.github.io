for file in *.png; do
	echo $file
	cp "$file" ./"${file%%.*}-thumb.png"
done


for file in *-thumb.png; do
	convert $file -resize 310x310^ -gravity center -extent 310x310 $file
done

