import {Course} from './course.entity';

describe('CourseEntity', () => {
  it('should create an instance', () => {
    expect(new Course({})).toBeTruthy();
  });
});
