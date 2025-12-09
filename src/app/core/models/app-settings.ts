import { City } from './city';
import { ContentSettings } from './content-settings';
import { ZmanimMethodType } from './zmanim-methods';

export interface ViewSettings {
	borderBrightness: number;
	themeColor: string;
	themeOpacity: number;
	font: string;
}

export interface AppSettings {
	view: ViewSettings;
	content: ContentSettings;
	location: City | null;
	zmanimMethod: ZmanimMethodType;
}