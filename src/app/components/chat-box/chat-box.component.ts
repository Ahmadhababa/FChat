import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  

  @Input() chat: any;
  @Input() current_user_id;

   convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(':');
    const hour12 = (hour % 12) || 12;
    const period = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute} ${period}`;
}
  constructor(
    
  ) { }

  ngOnInit() {}

}
