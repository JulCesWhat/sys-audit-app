import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAwsComponent } from './page-aws.component';

describe('PageAwsComponent', () => {
  let component: PageAwsComponent;
  let fixture: ComponentFixture<PageAwsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAwsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
