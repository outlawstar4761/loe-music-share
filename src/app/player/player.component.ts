import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from 'ngx-soundmanager2';
import { ActivatedRoute } from "@angular/router";
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import{
  HttpClient,
  HttpRequest,
  HttpHeaders
} from '@angular/common/http';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  mute:boolean;
  currentPlaying:any;
  currentTrackPostion:number;
  currentTrackDuration:number;
  currentTrackProgress:number;
  volume:number;
  token:string;
  song:any;
  regexPattern:RegExp = /\/LOE\//;
  domain:string = 'http://loe.outlawdesigns.io/';
  //subscriptions
  private _musicPlayerMuteSubscription: any;
  private _musicPlayerTrackIdSubscription:any;
  private _musicPlayerVolumeSubscription:any;

  constructor(private _musicPlayerService:MusicPlayerService,private route: ActivatedRoute,private http:HttpClient) {
    route.params.subscribe((params)=>{
      console.log(params);
      if(params['token'] == 'error'){
        window.location.href = "https://outlawdesigns.io";
      }
      this.token = params['token'];
      this.getSong().subscribe((song)=>{
        if(!song['error']){
          this.song = song;
          this._parseSong();
        }
      });
    });
  }

  ngOnInit() {
    // Subscribe for mute changes to update bindings
    this.mute = this._musicPlayerService.getMuteStatus();
    this._musicPlayerMuteSubscription = this._musicPlayerService.musicPlayerMuteEventEmitter.subscribe((event:any)=>{this.mute = event.data;});
    //Subscribe for track changes
    this.currentPlaying = this._musicPlayerService.currentTrackData();
    this._musicPlayerTrackIdSubscription = this._musicPlayerService.musicPlayerTrackEventEmitter.subscribe((event:any)=>{
      this.currentPlaying = this._musicPlayerService.currentTrackData();
      this.currentTrackPostion = event.data.trackPosition;
      this.currentTrackDuration = event.data.trackDuration;
      this.currentTrackProgress = event.data.trackProgress;
    });
    //Subscribe for volume changes
    this.volume = this._musicPlayerService.getVolume();
    this._musicPlayerVolumeSubscription = this._musicPlayerService.musicPlayerVolumeEventEmitter.subscribe((event:any)=>{
      this.volume = event.data;
    });
  }
  _parseSong():void{
    this.song.file_path = this.song.file_path.replace(this.regexPattern,this.domain);
    this.song.cover_path = this.song.cover_path.replace(this.regexPattern,this.domain);
    this.song.url = this.song.file_path;
    this.song.id = this.song.UID;
    this._musicPlayerService.addTrack(this.song);
    this._musicPlayerService.initPlayTrack(this.song.id,false);

    //set to play automatically
  }
  get progress():string{
    return this.currentTrackProgress ? (this.currentTrackProgress.toString() + '%') : '0%';
  }
  get playlist():any{
    return this._musicPlayerService.getPlaylist();
  }
  getSong():Observable<any>{
    let url = "https://api.outlawdesigns.io:9669/share/" + this.token
    return this.http.get<any>(url).pipe(map(response=>{return response}));
  }
}
