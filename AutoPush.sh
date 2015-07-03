git add .

autoDate = date +"%d-%m-%Y"
autoTime = date +"%T"
autoSpaaace = " - "
autoMessage = $autoDate$autoSpaaace$autoTime

git commit -m "$autoMessage"

echo 'Enter the name of the branch:'
read branch

git push origin $branch

read