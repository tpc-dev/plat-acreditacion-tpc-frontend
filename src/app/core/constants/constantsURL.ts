import { API_URL } from "../../../environments/environment"
import { HttpHeaders } from "@angular/common/http";

export class AppConstants {
    public static get baseURL(): string {
        return API_URL;
    }

}