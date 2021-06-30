import { Component, OnInit, ViewChild } from '@angular/core';
import {AgmMap,MapsAPILoader  } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;  
  lat: number;
  lng: number;
  getAddress: number;
  zoom: number;

  constructor(private apiloader: MapsAPILoader, private http:HttpClient) {}  



  
  products:any;
  productsDisplay:any
  searchtext:string;
  location:string;
  locations:any
  ngOnInit(): void {
    this.http.get('https://swachnode.herokuapp.com/products/getproducts').subscribe(data=>
    {
      this.locations=data;
      console.log(data);
    })
  }
  searcharray:any=["laptop","Headphones","PenDrive"];
  
  
  // locations:any=[
  //   {
  //     location:"Hyderabad",
  //     products:["hproduct1", "hproduct2", "hproduct3"]
  //   },
  //   {
  //     location:"Vizag",
  //     products:["vproduct1", "vproduct2", "vproduct3"]
  //   },
  //   {
  //     location:"Banglore",
  //     products:["bproduct1", "bproduct2", "bproduct3"]
  //   }  
  // ];
  locationarray:any=[
    "Hyderabad", "Vizag","Banglore"
  ]

  addsearchterm()
  {
    if(this.searchtext)
    {
      if(!this.searcharray.includes(this.searchtext))
    {
      this.searcharray.unshift(this.searchtext);
    }
    
    this.searcharray=this.searcharray.slice(0,5);
    }
  

    console.log('clicked');
   
    console.log(this.searcharray)
  }
check(searcharray:any)
{
  if(searcharray.length>0)
{
  return true
}
 else{
   return false
 }
}
getCurrentLocation()
{
  this.get();
}
  addlocations()
  {
    console.log('inside');

    if(this.location)
    { 
      if(!this.locationarray.includes(this.location))
    {
      this.locationarray.unshift(this.location);
     
    }
    this.locationarray=this.locationarray.slice(0,4);
     this.productsDisplay=this.location
    }



  }

  findproducts(i:any)
  {
    console.log(i);
    this.products=this.locations.products
  }
  get() {  
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition((position) => {  
            if (position) {  
                this.lat = position.coords.latitude;  
                this.lng = position.coords.longitude;  
                this.getAddress = (this.lat, this.lng)  

                console.log(position)  
                this.apiloader.load().then(() => {  
                    let geocoder = new google.maps.Geocoder;  
                    let latlng = {  
                        lat: this.lat,  
                        lng: this.lng  
                    };  
                    geocoder.geocode({  
                        'location': latlng  
                    }, function(results) {  
                        if (results[0]) {  
                            this.currentLocation = results[0].formatted_address;  
                            console.log(this.assgin);  
                        } else {  
                            console.log('Not found');  
                        }  
                    });  
                });  
            }  
        })  
    }  
}

}
