import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IOTService} from '../../service/IOTService';
import {IOTDTO} from '../../dto/IOTDTO';
import {ClockService} from '../../service/ClockService';
import {Observable, OperatorFunction, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoomService} from '../../service/RoomService';
import {RoomDTO} from '../../dto/RoomDTO';
import {HeaterMessageService} from '../../service/HeaterMessageService';
import {HeaterMessageDTO} from "../../dto/HeaterMessageDTO";
import {HeaterService} from "../../service/HeaterService";





@Component({
  // tslint:disable-next-line:component-selector
  selector: 'panne',
  templateUrl: './panne.component.html',
  styleUrls: ['./panne.component.scss']
})
export class PanneComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router,
              private route: ActivatedRoute,
              private iotservice: IOTService,
              private clockService: ClockService,
              private heaterService: HeaterService,
              private roomService: RoomService,
              private heaterMessageService: HeaterMessageService) {

  }
  object: Observable<any>;
  rooms: Observable<any>;
  // tslint:disable-next-line:ban-types
  heaterBreakdown: Object = new HeaterMessageDTO();

  breakdowns = [3, 2, 1];

  ngOnInit() {
    this.rooms = this.roomService.findAllRoom();
    this.breakdownRooms();
  }

  RoomDetail(room: RoomDTO) {
    this.object = this.clockService.findIOTByRoom(String(room.num));
  }

  breakdownHeatersDetection() {
    this.heaterService.countHeaters().subscribe( data => {
      for (let i = 0; i < data; i++) {
        this.breakdownHeaterDetection(i.toString());
      }
    });
  }

  private breakdownHeaterDetection(id: string) {
    // tslint:disable-next-line:max-line-length
    this.heaterMessageService.breakdownDetection(id).subscribe(data => {
      this.heaterBreakdown = data;
      if (data) {
        const toto = 'le radiateur ' + id + ' est en panne';
        alert(toto);
      }
      console.log('le radiateur', id , 'est en panne', data);
    } );
  }


  // Define the number of object in breakdown in a housing
  breakdownRooms() {
    // TODO : a loop with the number of rooms (ForEach?)
    this.breakdownRoom('1');
    this.breakdownRoom('2');
    this.breakdownRoom('3');
  }

  // define the number of object in breakdown and change the array breakdowns
  breakdownRoom(index: string) {
    // TODO : solve the problem with asynchronous functions
    this.clockService.findIOTByRoom(String(index)).pipe(
      // tslint:disable-next-line:triple-equals
      map(data => data.map(val => val.state).filter(x => x == 'off').length)
    ).subscribe(toto => {
      this.breakdowns[index] = toto;
      console.log(index, ' - ', toto); });
    console.log(this.rooms);
  }



}
