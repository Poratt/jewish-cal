import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Observable, combineLatest, map } from 'rxjs';
import { InstallService } from '../../../services/install.service';

@Component({
	selector: 'app-install-button',
	styleUrl: './install-button.component.css',
	templateUrl: './install-button.component.html',
	standalone: true,
	imports: [CommonModule, ButtonModule, DialogModule],
})
export class InstallButtonComponent implements OnInit {
	showInstallButton$: Observable<boolean>;
	isInstalled$: Observable<boolean>;
	showIOSInstructions = false;
	showHelpDialog = false;
	showIOSHelpDialog = false;
	private iosBannerDismissed = false;

	constructor(public installService: InstallService) {
		this.isInstalled$ = this.installService.isInstalled$;

		this.showInstallButton$ = combineLatest([
			this.installService.canInstall$,
			this.isInstalled$
		]).pipe(
			map(([canInstall, isInstalled]) => canInstall && !isInstalled)
		);
	}

	ngOnInit() {
		setTimeout(() => {
			if (this.installService.isIOSSafari() &&
				!this.installService.isStandalone() &&
				!this.iosBannerDismissed) {
				this.showIOSInstructions = true;
			}
		}, 1000);
	}

	async installPWA() {
		const installed = await this.installService.installApp();
		if (!installed) {
			this.showHelpDialog = true;
		}
	}

	dismissIOSBanner() {
		this.showIOSInstructions = false;
		this.iosBannerDismissed = true;
	}
}