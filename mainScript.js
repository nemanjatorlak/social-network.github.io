
var allUsersDiv = document.getElementById('allUsers');
var clickedUserID = -1;
var data;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        data = JSON.parse(xhttp.response);

        populateUsers(data);
    }
};
xhttp.open("GET", "data.json", true);
xhttp.send();

function populateUsers(data) {

    for (i = 0; i < data.length; i++) {

        function createAUser(id, size) {
            var userDiv = document.createElement('div');
            userDiv.setAttribute('class', 'col-6 col-md-4 col-lg-' + size + ' userDiv');
            userDiv.setAttribute('id', id + 1);

            var row = document.createElement('div');
            row.setAttribute('class', 'row');


            var imageDiv = document.createElement('div');
            imageDiv.setAttribute('class', 'col-4 no-padding');

            var image = document.createElement('img');

            var dataRowsDiv = document.createElement('div');
            dataRowsDiv.setAttribute('class', 'col-8');

            var firstNameDiv = document.createElement('div');
            firstNameDiv.setAttribute('class', 'col-12');
            firstNameDiv.textContent = 'First Name: ' + data[id].firstName;

            var surnameDiv = document.createElement('div');
            surnameDiv.setAttribute('class', 'col-12');
            surnameDiv.textContent = 'Surname: ' + data[id].surname;

            var ageDiv = document.createElement('div');
            ageDiv.setAttribute('class', 'col-12');
            ageDiv.textContent = 'Age: ' + data[id].age;

            var genderDiv = document.createElement('div');
            genderDiv.setAttribute('class', 'col-12');
            genderDiv.textContent = 'Gender: ' + data[id].gender;


            if (data[id].gender === 'male')
                image.src = 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png';
            else if (data[id].gender === 'female')
                image.src = 'https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/60-512.png';
            else
                image.src = 'http://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png';


            imageDiv.appendChild(image);

            dataRowsDiv.appendChild(firstNameDiv);
            dataRowsDiv.appendChild(surnameDiv);
            dataRowsDiv.appendChild(ageDiv);
            dataRowsDiv.appendChild(genderDiv);

            row.appendChild(imageDiv);
            row.appendChild(dataRowsDiv);

            userDiv.appendChild(row);

            return userDiv;
        }

        allUsersDiv.appendChild(createAUser(i, 3));

        var userDivClass = document.getElementsByClassName('userDiv');

        userDivClass[i].addEventListener('click', function () {
            if (clickedUserID != -1)
                return;
            else {
                clickedUserID = this.id;
                var rect = this.getBoundingClientRect();

                this.style.top = ((parseInt(document.body.clientHeight) / 2) - (parseInt(this.offsetHeight) / 2) - rect.top - 50) + 'px';
                this.style.left = ((parseInt(document.body.clientWidth) / 2) - (parseInt(this.offsetWidth) / 2) - rect.left) + 'px';

                this.classList.add('class', 'opacityShowing');

                for (j = 0; j < userDivClass.length; j++) {
                    userDivClass[j].classList.add('opacityHidden');
                    userDivClass[j].onclick = null;
                }

                var rowUserFriendsAndSuggestedFriends = document.createElement('div');
                rowUserFriendsAndSuggestedFriends.setAttribute('class', 'row');
                rowUserFriendsAndSuggestedFriends.setAttribute('id', 'popup');

                var friendsDiv = document.createElement('div');
                friendsDiv.setAttribute('class', 'col-3 col-sm-12 col-lg-3');

                var rowFriends = document.createElement('div');
                rowFriends.setAttribute('class', 'row');

                var friendsTitleDiv = document.createElement('div');
                friendsTitleDiv.setAttribute('class', 'col-12 title');
                friendsTitleDiv.textContent = 'Friends';

                var rowFriends2 = document.createElement('div');
                rowFriends2.setAttribute('class', 'row');

                var friendsUsersDiv = document.createElement('div');
                friendsUsersDiv.setAttribute('class', 'col-12');


                /* Direct Friends list */

                data[clickedUserID - 1].friends.forEach(function (item) {
                    rowFriends2.appendChild(createAUser(item - 1, 12));
                });

                rowFriends.appendChild(friendsTitleDiv);
                friendsUsersDiv.appendChild(rowFriends2);
                rowFriends.appendChild(friendsUsersDiv);
                friendsDiv.appendChild(rowFriends);


                var friendsOfFriendsDiv = document.createElement('div');
                friendsOfFriendsDiv.setAttribute('class', 'col-3 col-sm-12 col-lg-3 offset-lg-1 offset-sm-0 paddingTop');

                var rowFriendsOfFriends = document.createElement('div');
                rowFriendsOfFriends.setAttribute('class', 'row');

                var rowFriendsOfFriends2 = document.createElement('div');
                rowFriendsOfFriends2.setAttribute('class', 'row');

                var friendsOfFriendsTitleDiv = document.createElement('div');
                friendsOfFriendsTitleDiv.setAttribute('class', 'col-12 title');
                friendsOfFriendsTitleDiv.textContent = 'Friends of Friends';

                var friendsOfFriendsUsersDiv = document.createElement('div');
                friendsOfFriendsUsersDiv.setAttribute('class', 'col-12');


                /* Friends of friends */
                var friendsOfFriendsList = [];
                data[clickedUserID - 1].friends.forEach(function (item) {
                    data[item - 1].friends.forEach(function (item) {
                        if (!friendsOfFriendsList.includes(item) && clickedUserID != item && !data[clickedUserID - 1].friends.includes(item)) {
                            rowFriendsOfFriends2.appendChild(createAUser(item - 1, 12));
                            friendsOfFriendsList.push(item);
                        }
                    });
                });


                rowFriendsOfFriends.appendChild(friendsOfFriendsTitleDiv);
                friendsOfFriendsUsersDiv.appendChild(rowFriendsOfFriends2);
                rowFriendsOfFriends.appendChild(friendsOfFriendsUsersDiv);
                friendsOfFriendsDiv.appendChild(rowFriendsOfFriends);


                var suggestedFriendsDiv = document.createElement('div');
                suggestedFriendsDiv.setAttribute('class', 'col-3 col-sm-12 col-lg-3 offset-lg-1 offset-sm-0 paddingTop');

                var rowSuggestedFriends = document.createElement('div');
                rowSuggestedFriends.setAttribute('class', 'row');

                var rowSuggestedFriends2 = document.createElement('div');
                rowSuggestedFriends2.setAttribute('class', 'row');

                var suggestedFriendsTitleDiv = document.createElement('div');
                suggestedFriendsTitleDiv.setAttribute('class', 'col-12 title');
                suggestedFriendsTitleDiv.textContent = 'Suggested Friends';

                var suggestedFriendsUsersDiv = document.createElement('div');
                suggestedFriendsUsersDiv.setAttribute('class', 'col-12');

                /* Suggested friends */
                var listOfFriends = data[clickedUserID - 1].friends;

                var suggestedFriendsList = [];

				/* For each friend of the user's friend, I check their friends list and create a counter
                     * that will keep track of how many of the user's friends that person knows.
                     * If that number is more than 1, that person qualifies to be suggested as a friend.
                     * */
					 
                friendsOfFriendsList.forEach(function (friendsOfMyFriends) {
                    var friendsOfFriendsCounter = 0;
                    data[friendsOfMyFriends - 1].friends.forEach(function (myFriends) {
                        if (listOfFriends.includes(myFriends)) {
                            friendsOfFriendsCounter++;
                        }
                    });

                    if (friendsOfFriendsCounter > 1 && !suggestedFriendsList.includes(friendsOfMyFriends)) {
                        suggestedFriendsList.push(friendsOfMyFriends);
                        rowSuggestedFriends2.appendChild(createAUser(friendsOfMyFriends - 1, 12));
                    }
                });

                rowSuggestedFriends.appendChild(suggestedFriendsTitleDiv);
                suggestedFriendsUsersDiv.appendChild(rowSuggestedFriends2);
                rowSuggestedFriends.appendChild(suggestedFriendsUsersDiv);
                suggestedFriendsDiv.appendChild(rowSuggestedFriends);


                rowUserFriendsAndSuggestedFriends.appendChild(friendsDiv);
                rowUserFriendsAndSuggestedFriends.appendChild(friendsOfFriendsDiv);
                rowUserFriendsAndSuggestedFriends.appendChild(suggestedFriendsDiv);

                friendsDiv.style.transition = 'all 2s ease-in-out';
                friendsDiv.style.width = '100%';
                friendsDiv.style.opacity = '0';
                friendsDiv.style.top = '150px';
                friendsOfFriendsDiv.style.transition = 'all 2s ease-in-out';
                friendsOfFriendsDiv.style.width = '100%';
                friendsOfFriendsDiv.style.opacity = '0';
                friendsOfFriendsDiv.style.top = '150px';
                suggestedFriendsDiv.style.transition = 'all 2s ease-in-out';
                suggestedFriendsDiv.style.width = '100%';
                suggestedFriendsDiv.style.opacity = '0';
                suggestedFriendsDiv.style.top = '150px';

                rowUserFriendsAndSuggestedFriends.style.top = '-30%';
                rowUserFriendsAndSuggestedFriends.style.position = 'relative';

                allUsersDiv.appendChild(rowUserFriendsAndSuggestedFriends);

                setTimeout(function () {
                    rowUserFriendsAndSuggestedFriends.style.opacity = '1';
                }, 1500);

                setTimeout(function () {
                    friendsDiv.style.top = '0px';
                    friendsDiv.style.opacity = '1';
                }, 1500);
                setTimeout(function () {
                    friendsOfFriendsDiv.style.top = '0px';
                    friendsOfFriendsDiv.style.opacity = '1';
                }, 2500);
                setTimeout(function () {
                    suggestedFriendsDiv.style.top = '0px';
                    suggestedFriendsDiv.style.opacity = '1';
                }, 3500);

            }
            ;
            document.getElementById('buttonDiv').style.top = '150px';
            document.getElementById('buttonDiv').style.opacity = '1';
            document.getElementById('buttonDiv').style.zIndex = '1';

            document.getElementById('goBack').addEventListener('click', function () {
                var popup = document.getElementById('popup');

                document.getElementById('buttonDiv').style.opacity = '0';

                setTimeout(function () {
                    friendsDiv.style.top = '150px';
                    friendsDiv.style.opacity = '0';
                }, 500);
                setTimeout(function () {
                    friendsOfFriendsDiv.style.top = '150px';
                    friendsOfFriendsDiv.style.opacity = '0';
                }, 1500);
                setTimeout(function () {
                    suggestedFriendsDiv.style.top = '150px';
                    suggestedFriendsDiv.style.opacity = '0';
                    document.getElementById(clickedUserID).style.top = '';
                    document.getElementById(clickedUserID).style.left = '';
                    document.getElementById(clickedUserID).classList.remove("opacityShowing");
                }, 2500);
                setTimeout(function () {
                    document.getElementById('buttonDiv').style.zIndex = '-1';
                    for (j = 0; j < userDivClass.length; j++) {
                        userDivClass[j].classList.remove('opacityHidden');
                    }
                }, 3000);

                setTimeout(function () {
                    if (popup.parentNode !== null) {
                        popup.parentNode.removeChild(popup);
                        clickedUserID = -1;
                    }
                }, 4000);
            });
        });
    }
}


