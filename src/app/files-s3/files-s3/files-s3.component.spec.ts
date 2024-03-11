import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesS3Component } from './files-s3.component';

describe('FilesS3Component', () => {
  let component: FilesS3Component;
  let fixture: ComponentFixture<FilesS3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesS3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesS3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
