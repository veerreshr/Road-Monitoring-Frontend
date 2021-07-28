
![Logo](https://res.cloudinary.com/dcgefz04y/image/upload/v1627455237/RoadScan_fn4lj4.png)

    
# RoadScan

Road anomalies detector is a web application which primarily detects
the potholes using smartphone sensors and also helps people by notifying them
about the occurrence of potholes ahead of time.

Working on a principle of moving averages and changes of acceleration, it helps the
citizens to detect the presence of potholes on road ahead of time so that these
potholes can be filled up in a timely manner and also helps them to avoid any damage
that can be caused because of it.

It makes use of mobile phones with android operating system which have an in-built
Accelerometer and GPS sensors. For the process of detection of potholes, the
application uses the accelerometer readings to detect the presence of potholes. Using
that information, it then calculates the precise location and updates the cloud data
regarding the presence of potholes. This data can be used by people for safe travel or
by authorities to rectify such anomalies on road.


## Demo

[Live App](https://roadscan.netlify.app/)

[Pothole Alert Demo](https://drive.google.com/file/d/1dfsC2T_IxpFsWF3yKCHeYs5lw7FP7H4g/view?usp=sharing)

[Pothole Data Update](https://drive.google.com/file/d/1ddx5OeiMJJID9OijlGkfbyBz1kZmo4yP/view?usp=sharing)  

[More Information](https://drive.google.com/file/d/10iuTGqTLssx0JNuGOLUWOTymlVk3Fc3L/view?usp=sharing)
## Screenshots

![App Screenshot](https://res.cloudinary.com/dcgefz04y/image/upload/v1627453651/PicsArt_07-27-08.55.20_sbagvh.jpg)

## Design

![Design](https://res.cloudinary.com/dcgefz04y/image/upload/v1627454526/RoadScanSystemDesign_d0pfh0.png)
## Features

- Pothole Alerts
- Pothole Testing and Updating
- Parameter Testing-Finding threshold


  
## Tech Stack

**Client:** Vite Js, easy-peasy, Material UI

**Database:** Firebase Realtime Database

**Other Technologies**: Generic Sensor APIs, Fusion Charts etc.

  
## Run Locally

Clone the project

```bash
git clone https://link-to-project
```

Go to the project directory

```bash
cd my-project
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

  
## Future Enhancements

- Support to more vehicles
- Improved threshold detection algorithm
- Improved Map Functionality
- Login and Sign Up screen
- Landing page with all details about the app
- Different Algorithms to classify different anomalies like cluster gaps, drain pits, large and small potholes

  
## Acknowledgements

[[1]](https://www.researchgate.net/publication/316926996) RoadSense: Smartphone Application to Estimate Road Conditions Using
Accelerometer and Gyroscope.

[[2]](https://ieeexplore.ieee.org/document/5982206) Real time pothole detection using Android smartphones with accelerometers

[[3]](https://www.researchgate.net/publication/224253154_Real_Time_Pothole_Detection_Using_Android_Smartphones_with_Accelerometers) Real Time Pothole Detection Using Android Smartphones with Accelerometers

[4] Humps and Pothole Detection and Alerting System for Safe Journey- Shubhada
Vital Poojary1, Rashmi M2, Sudheer Shetty3

[5] Speed Bump Detection Using Accelerometric Features: A Genetic Algorithm
Approach Jose M. Celaya-Padilla 1,*, Carlos E. Galván-Tejada 2 , F. E. LópezMonteagudo 2 , O. Alonso-González 3 , Arturo Moreno-Báez 2 , Antonio MartínezTorteya 4 , Jorge I. Galván-Tejada 2 , Jose G. Arceo-Olague 2 , Huizilopoztli LunaGarcía 2 and Hamurabi Gamboa-Rosales 2
## License

[MIT](https://choosealicense.com/licenses/mit/)

  
## Support

For support, please email veerreshr@gmail.com.

  
