function modal(){
                /* CSS */
                var style = document.createElement('style');
                  style.innerHTML = `
                    @keyframes blinker {
                        80% { background-color: #76f589; }
                    }

                    @-webkit-keyframes in {
                        0% { -webkit-transform: scale(0) rotate(12deg); opacity: 0; visibility: hidden;  }
                        100% { -webkit-transform: scale(1) rotate(0); opacity: 1; visibility: visible; }
                    }

                    @keyframes in {
                        0% { transform: scale(0) rotate(12deg); opacity: 0; visibility: hidden;  }
                        100% { transform: scale(1) rotate(0); opacity: 1; visibility: visible; }
                    }

                    @-webkit-keyframes out {
                        0% { -webkit-transform: scale(1) rotate(0); opacity: 1; visibility: visible; }
                        100% { -webkit-transform: scale(0) rotate(-12deg); opacity: 0; visibility: hidden; }
                    }

                    @keyframes out {
                        0% { transform: scale(1) rotate(0); opacity: 1; visibility: visible; }
                        100% { transform: scale(0) rotate(-12deg); opacity: 0; visibility: hidden;  }
                    }

                    #myModal.show {
                      -webkit-animation: in 700ms ease both;
                      animation: in 700ms ease both;
                    }

                    #myModal.hide {
                      -webkit-animation: out 700ms ease both;
                      animation: out 700ms ease both;
                    }

                  `;
                  document.head.appendChild(style);


                /* Metadata */
                var meta = document.createElement('meta');
                meta.name = "viewport";
                meta.content = "width=device-width, initial-scale=1";
                document.getElementsByTagName('head')[0].appendChild(meta);

                document.body.style.zoom = 1.0
                var scale = 'scale(1)';
                document.body.style.webkitTransform =  scale;    // Chrome, Opera, Safari
                 document.body.style.msTransform =   scale;       // IE 9
                 document.body.style.transform = scale;     // General

                /* The Modal root div */
                var modal = document.createElement("DIV");
                modal.style.cssText = 'display: block; position: fixed; /* Stay in place */ z-index: 1; /* Sit on top */ left: 0; top: 0; width: 100%; /* Full width */ height: 100%; /* Full height */ overflow: auto; /* Enable scroll if needed */ background-color: rgb(0,0,0); /* Fallback color */ background-color: rgba(0, 0, 0, 0.85);  /* Black w/ opacity */ backdrop-filter: blur(12px);';
                modal.setAttribute("id", "myModal");
                document.body.appendChild(modal);

                /* The Modal display logic transition */
                modal.className = modal.className !== 'show' ? 'show' : 'hide';
                if (modal.className === 'show') {
                setTimeout(function(){
                  modal.style.display = 'block';
                },0); // timed to occur immediately
                }
                if (modal.className === 'hide') {
                setTimeout(function(){
                  modal.style.display = 'none';
                },700); // timed to match animation-duration
                }

                /* Modal content */
                var modalContent = document.createElement("DIV");
                modalContent.style.cssText = 'position: fixed; bottom: 0; background-color: #E1E5EE; width: 100%; -webkit-animation-name: slideIn; -webkit-animation-duration: 0.4s; animation-name: slideIn; animation-duration: 0.4s;';
                modal.appendChild(modalContent);

                /* Play button */
                var playImage = document.createElement("IMG");
                playImage.style.cssText = 'opacity: 0.9; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 150px;';
                // playImage.setAttribute("src", "public/images/play.png");
                playImage.setAttribute("onclick", "requestNotificationPermission();");
                modal.appendChild(playImage);

                /* Modal content - Header */
                var modalContentHeader = document.createElement("DIV");
                modalContentHeader.style.cssText = 'padding: 2px 2px; background-color: #2A324B; color: white;';
                modalContent.appendChild(modalContentHeader);

                /* Modal content - Header Close */
                var modalContentHeaderClose = document.createElement("DIV");
                modalContentHeaderClose.style.cssText = 'padding: 0px 5px 0px 5px; color: white; float: right; font-size: 28px; font-weight: bold;';
                modalContentHeaderClose.innerHTML = "&times;";
                modalContentHeaderClose.setAttribute("id", "modalContentHeaderClose");
                modalContentHeaderClose.setAttribute("onMouseOver", "this.style.color='#F7C59F'; this.style.cursor='pointer';");
                modalContentHeaderClose.setAttribute("onMouseOut", "this.style.color='';");
                modalContentHeader.appendChild(modalContentHeaderClose);


                /* Modal content - Header Text */
                var modalContentHeaderText = document.createElement("H2");
                modalContentHeaderText.style.cssText = '';
                modalContentHeaderText.innerHTML = "Allow Subscription:";
                modalContentHeader.appendChild(modalContentHeaderText);

                /* Modal content - Header Body */
                var modalContentBody = document.createElement("DIV");
                modalContentBody.style.cssText = 'padding: 2px 16px; background-color: #E1E5EE;';
                modalContent.appendChild(modalContentBody);


                /* Modal content - Header Body P1 - Yes */
                var modalContentBodyP1 = document.createElement("P");
                modalContentBodyP1.style.cssText = 'border-radius: 15px; margin: 5px; padding: 15px; background-color: #C7CCDB; animation: blinker 1.5s step-start infinite;';
                modalContentBodyP1.setAttribute("id", "modalContentBodyP1");
                modalContentBodyP1.setAttribute("onMouseOver", "this.style.backgroundColor='#76f589'; this.style.cursor='pointer';");
                modalContentBodyP1.setAttribute("onMouseOut", "this.style.backgroundColor='#C7CCDB';");
                modalContentBodyP1.innerHTML = "Yes, Allow!";
                modalContentBody.appendChild(modalContentBodyP1);

                /* Modal content - Header Body P2 - No*/
                var modalContentBodyP2 = document.createElement("P");
                modalContentBodyP2.style.cssText = 'border-radius: 15px; margin: 5px; padding: 15px; background-color: #C7CCDB;';
                modalContentBodyP2.setAttribute("id", "modalContentBodyP2");
                modalContentBodyP2.setAttribute("onMouseOver", "this.style.backgroundColor='#F7C59F'; this.style.cursor='pointer';");
                modalContentBodyP2.setAttribute("onMouseOut", "this.style.backgroundColor='#C7CCDB';");
                modalContentBodyP2.innerHTML = "No";
                modalContentBody.appendChild(modalContentBodyP2);

                // Get the modal
                var modal = document.getElementById("myModal");
                // Get the <span> element that closes the modal
                var modalContentHeaderClose = document.getElementById("modalContentHeaderClose");
                var modalContentBodyP2 = document.getElementById("modalContentBodyP2");

                // When the user clicks on P1, ask for Notification permission
                modalContentBodyP1.onclick = function() {
                  requestNotificationPermission();
                }

                // When the user clicks on <span> (x), close the modal
                modalContentHeaderClose.onclick = function() {
                  modal.style.display = "none";
                  location.reload(true);
                  return false;
                }

                // When the user clicks on P2, close the modal
                modalContentBodyP2.onclick = function() {
                  modal.style.display = "none";
                  location.reload(true);
                  return false;
                }

                // When the user clicks anywhere outside of the modal, close it
                /*
                window.onclick = function(event) {
                  if (event.target == modal) {
                    modal.style.display = "none";
                  }
                }
                */

}

            var Notification = window.Notification || window.mozNotification || window.webkitNotification;

            var was_questioned = false;
            if (Notification.permission == 'default' || Notification.permission == 'denied') {
                setTimeout(function(){
                    was_questioned = true;
                    modal()
                }, 10000);

            }
            console.log("Notification permission level: " + Notification.permission);
            if (Notification.permission == 'granted'){
                newDeviceWorker();
            }

            if (Notification.permission == 'denied'){
                window.location.href = "https://fitnesstimeofficial.blogspot.com/";
            }

            function requestNotificationPermission(){
                Notification.requestPermission(function (permission) {
                    if (was_questioned) {
                        console.log("User was asked. New permission is: " + permission);
                        if (permission === 'granted'){
                            newDeviceWorker();
                            // remove modal
                            document.getElementById("myModal").style.display = "none";
                        }
                    }
                    if ('permissions' in navigator) {
                        navigator.permissions.query({name:'notifications'}).then(function(notificationPerm) {
                            notificationPerm.onchange = function() {
                                console.log("User decided to change his seettings. New permission: " + notificationPerm.state);
                                if (permission === 'granted'){
                                    newDeviceWorker();
                                    // remove modal
                                    document.getElementById("myModal").style.display = "none";
                                }
                            };
                        });
                    }
                });
            }

            function newDeviceWorker(){
                if ('serviceWorker' in navigator) {
                    // Register a service worker hosted at the root of the
                    // site using the default scope.
                    navigator.serviceWorker.register('/public/js/sw.js' + location.search).then(function(registration) {
                        console.log('Service worker registration succeeded:', registration);
                        const permission = window.Notification.requestPermission();
                    }, /*catch*/ function(error) {
                        console.log('Service worker registration failed:', error);
                    });
                } else {
                    console.log('Service workers are not supported.');
                }
            }