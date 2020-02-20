import {Component, OnInit} from '@angular/core';
import {PersonDTO} from "../../dto/PersonDTO";
import {PersonService} from "../../service/PersonService";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/AuthService";

@Component({
  selector: 'connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  person: PersonDTO;
  isConnectionGood: boolean=null;

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.person = new PersonDTO();
  }

  verifyConnection() {
    this.route.params.subscribe(params => {
      this.personService.verifyConnection(this.person).subscribe(data => {
        if (data != null) {
          this.person = data;
          this.authService.setSession(data);
          localStorage.setItem('user', JSON.stringify(this.person));
          this.router.navigate(['/home']);
        } else {
          this.isConnectionGood = false;
        }
      })
    })

  }

}
