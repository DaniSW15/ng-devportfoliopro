import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { LoginPageComponent } from './login-page.component';
import { AuthFacade } from '../../services/auth.facade';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        {
          provide: AuthFacade,
          useValue: {
            isLoading: signal(false),
            isAuthenticated: signal(false),
            user: signal(null),
            error: signal<string | null>(null),
            login: jasmine.createSpy('login').and.resolveTo({
              user: {
                id: '1',
                email: 'test@dev.com',
                name: 'Test',
                avatarUrl: '',
                role: 'user',
              },
            }),
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
