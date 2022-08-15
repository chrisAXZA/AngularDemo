import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    const note = new Note(form.value.title, form.value.content);
    this.noteService.addNote(note);
    
    // alert("Form has been added!");
  }
}
