import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageChefComponent } from './page-chef.component';

describe('PageChefComponent', () => {
  let component: PageChefComponent;
  let fixture: ComponentFixture<PageChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
