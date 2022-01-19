function modal(){
                /* */
                var style = document.createElement('style');
                  style.innerHTML = `
                    @keyframes blinker { 80% { background-color: #76f589; }
                  `;
                  document.head.appendChild(style);


                /* */
                var meta = document.createElement('meta');
                meta.name = "viewport";
                meta.content = "width=device-width, initial-scale=1";
                document.getElementsByTagName('head')[0].appendChild(meta);

                /* The Modal */
                var modal = document.createElement("DIV");
                modal.style.cssText = 'display: block; position: fixed; /* Stay in place */ z-index: 1; /* Sit on top */ left: 0; top: 0; width: 100%; /* Full width */ height: 100%; /* Full height */ overflow: auto; /* Enable scroll if needed */ background-color: rgb(0,0,0); /* Fallback color */ background-color: rgba(0, 0, 0, 0.60);  /* Black w/ opacity */ backdrop-filter: blur(8px);';
                modal.setAttribute("id", "myModal");
                document.body.appendChild(modal);

                /* Modal content */
                var modalContent = document.createElement("DIV");
                modalContent.style.cssText = 'position: fixed; bottom: 0; background-color: #E1E5EE; width: 100%; -webkit-animation-name: slideIn; -webkit-animation-duration: 0.4s; animation-name: slideIn; animation-duration: 0.4s;';
                modal.appendChild(modalContent);

                /* Modal content - Header */
                var modalContentHeader = document.createElement("DIV");
                modalContentHeader.style.cssText = 'padding: 2px 2px; background-color: #2A324B; color: white;';
                modalContent.appendChild(modalContentHeader);

                /* Modal content - Header Close */
                var modalContentHeaderClose = document.createElement("DIV");
                modalContentHeaderClose.style.cssText = 'color: white; float: right; font-size: 28px; font-weight: bold;';
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
                  location.reload();
                }

                // When the user clicks on P2, close the modal
                modalContentBodyP2.onclick = function() {
                  modal.style.display = "none";
                  location.reload();
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
                was_questioned = true;
                modal();
            }
            console.log("Notification permission level: " + Notification.permission);
            if (Notification.permission == 'granted'){
                newDeviceWorker();
            }

            if (Notification.permission == 'denied'){
                window.location.href = "http://www.w3schools.com";
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
                    navigator.serviceWorker.register('/sw.js').then(function(registration) {
                        console.log('Service worker registration succeeded:', registration);
                        const permission = window.Notification.requestPermission();
                    }, /*catch*/ function(error) {
                        console.log('Service worker registration failed:', error);
                    });
                } else {
                    console.log('Service workers are not supported.');
                }
            }