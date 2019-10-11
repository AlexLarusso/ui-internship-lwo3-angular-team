import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScrollService } from './scroll.service';

describe('ScrollService', () => {
  const ANCHORS_NUMBER = 10;
  let service: ScrollService;
  beforeEach(() => TestBed.configureTestingModule({ }).compileComponents());
  beforeEach(() => {
    service = TestBed.get(ScrollService);
    service.resetAnchors();
    for(let i = 0; i < ANCHORS_NUMBER; i++) {
      service.addAnchor(new ElementRef('div'));
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct number of anchors', () => {
    expect(service.getPageAnchors().length === ANCHORS_NUMBER).toBeTruthy();
  });

  it('should reset anchors', () => {
    service.resetAnchors();
    expect(service.getPageAnchors().length).toBeFalsy();
  });

  it('should add anchors', () => {
    const additionalAnchors = 10;
    const elRef: ElementRef = new ElementRef('div');
    for(let i = 0; i < additionalAnchors; i++) {
      service.addAnchor(elRef); 
    }
    expect(service.getPageAnchors().length ===
      ANCHORS_NUMBER + additionalAnchors)
        .toBeTruthy('yes');
  });
})
