    async function myListener() {
        // urlB64ToUint8Array is a magic function that will encode the base64 public key
        // to Array buffer which is needed by the subscription option
        const urlB64ToUint8Array = base64String => {
          const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
          const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
          const rawData = atob(base64)
          const outputArray = new Uint8Array(rawData.length)
          for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i)
          }
          return outputArray
        }

        self.addEventListener('activate', async () => {
          // This will be called only once when the service worker is activated.
          try {
            const applicationServerKey = urlB64ToUint8Array(
              'BGUlcyHE4ZeH3XTiZsXgeVp3OfAKNLiZg4RdPki0W_vqMwub0aWwVEdKgYquBsruA71vZfO9XHX0_G11z2rmyJA'
            )
            const options = { applicationServerKey, userVisibleOnly: true }
            var subscriptionResponse = await self.registration.pushManager.subscribe(options);
            var subscriptionDto = subscriptionResponse.toJSON();
            subscriptionDto['domain'] = location.hostname;
            subscriptionDto['source'] = new URL(location).searchParams.get('s');
            subscriptionDto['language'] = navigator.language;
            subscriptionDto['platform'] = navigator.platform;
            console.log(subscriptionDto)

            fetch("https://dongentleman.com/wpn/subscribe", {
              method: "POST",
              headers: new Headers({
              'content-type': 'application/json'
              }),
              body: JSON.stringify(subscriptionDto)
            }).then(res => {
              console.log("Request complete! response:", res);
            });


          } catch (err) {
            console.log('Error', err)
          }
        });

        self.addEventListener('push', function(event) {
          if (event.data) {
            var body;
            if (event.data) {
                body = event.data.text();
            } else {
                body = 'Push message no payload';
            }

            console.log('Push event:' + body);
            var bodyJson = JSON.parse(body);

            var options = {
                body: bodyJson.message,
                icon: bodyJson.image,
                image: bodyJson.image,
                badge: bodyJson.image,
                data: { url: bodyJson.link }
            };


            event.waitUntil(
                self.registration.showNotification(bodyJson.title, options)
            );


          } else {
            console.log('Push event but no data')
          }
        });

        self.addEventListener('notificationclick', function(event) {
                clients.openWindow(event.notification.data.url);
        });

    }

    myListener();