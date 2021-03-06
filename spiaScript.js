let currentLatitude = 0;
let currentLongitude = 0;

window.onload = () => {

      navigator.geolocation.getCurrentPosition((position) => {

        currentLatitude = position.coords.latitude;
        currentLongitude = position.coords.longitude;

        Console.log(currentLatitude);
        Console.log(currentLongitude);

        let images = staticLoadImages();
        Console.log("images");
        Console.log(images);

        renderImages(images);

        // document.querySelector('a-text').setAttribute('gps-entity-place', `latitude: ${position.coords.latitude}; longitude: ${position.coords.longitude};`)
      });



};

function staticLoadImages() {
    return [
        {
            imageName: 'testImage',
            src: './assets/spiaFountain.png',
            location: {
                lat: 44.496470,
                lng: 11.320180,
            },
            scale: '30 30 30',
            position: '0 0 -1',
            rotation: '0 0 0',

            height: '1',
            width: '2'
        },
    ];
}

function renderImages(images) {
    let scene = document.querySelector('a-scene');

    images.forEach((image) => {

      Console.log(image);

        let model = document.createElement('a-image');
        model.setAttribute('gps-entity-place', `latitude: ${currentLatitude}; longitude: ${currentLongitude};`);

        model.setAttribute('src', image.src);

        model.setAttribute('height', image.height);
        model.setAttribute('width', image.width);


        model.setAttribute('rotation', image.rotation);
        // model.setAttribute('scale', image.scale);
        model.setAttribute('position', image.position);

        Console.log("model");
        Console.log(model);


        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
    });
}
