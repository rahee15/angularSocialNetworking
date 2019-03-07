import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfriendComponent } from './searchfriend.component';

describe('SearchfriendComponent', () => {
  let component: SearchfriendComponent;
  let fixture: ComponentFixture<SearchfriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchfriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
