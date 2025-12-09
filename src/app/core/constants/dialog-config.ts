export const DialogConfig = {
	width: '100%',
	// height: 'fit-content',
	modal: true,
	draggable: true,
	// resizable: true,
	closable: true,
	dismissableMask: true,
	appendTo: 'body',
	a11yCloseLabel: 'סגור',
	focusOnShow: false,
	autofocus: true,
	

	// UX 
	closeOnEscape: true,
	baseZIndex: 1000,
	showHeader: true,

	position: 'center',
	// contentStyle: { padding: '1.25rem' },

	// breakpoints: {
	//   '960px': '75vw',
	//   '640px': '90vw'
	// },

	// Custom Style
	styleClass: 'p-dialog',

	style: {
		'max-width': '400px',
		'min-width': '300px',
	},

	// transitionOptions: '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
};


export const DialogConfigWide = {
	...DialogConfig,
    width: '95vw',
	style: {
		'max-width': '800px',
		'min-width': '380px'
	},
}


export const ConfirmDialogConfig = {
	...DialogConfig,
	header: 'אישור',
	icon: 'pi pi-exclamation-triangle',
	acceptLabel: 'אישור',
	rejectLabel: 'ביטול',
	acceptIcon: 'pi pi-check',
	rejectIcon: 'pi pi-times',
	acceptButtonStyleClass: 'p-button-primary',
	rejectButtonStyleClass: 'p-button-secondary',
};
