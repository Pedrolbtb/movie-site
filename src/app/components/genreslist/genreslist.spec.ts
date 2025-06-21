import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Genreslist } from './genreslist';

describe('Genreslist', () => {
  let component: Genreslist;
  let fixture: ComponentFixture<Genreslist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Genreslist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Genreslist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
