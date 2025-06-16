import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="navbar fixed-top navbar-dark bg-primary">
      <nav class="container">
        <span class="navbar-brand">Angular Core Concepts</span>
      </nav>
    </header>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {}
