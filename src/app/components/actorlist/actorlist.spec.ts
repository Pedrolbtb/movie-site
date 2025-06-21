import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actorlist } from './actorlist';

describe('Actorlist', () => {
  let component: Actorlist;
  let fixture: ComponentFixture<Actorlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Actorlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actorlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
