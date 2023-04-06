import { HttpHeaders } from '@angular/common/http';
export class Constants {

    public static API_ENDPOINT = 'https://devapi.koola.online/api/v2/';
    public static APIKEY = '30b07b472d578e33528818abfd10b8f47094ebe8fb1ba142d4ad147bf795dd0e';
    public static BASE_OFFERING = 'primitive/_func/v_koola_sp_base_offering_select';
    public static USER_SESSION = 'user/session';
    public static AMINITIES = 'primitive/_func/v_koola_amenity_select';
    public static COACH_SESSION_INSTANCE_CREATE = 'primitive/_func/v_koola_opportunity_instance_create';
    public static COACH_SESSION_INSTANCE_DELETE = 'primitive/_func/v_koola_opportunity_instance_update';
    public static VENUE_SELECT = 'primitive/_func/v_koola_venue_select';
    public static K_IMAGE_SELECT = 'primitive/_func/v_koola_image_select';

    //sessionDetails
    public static OPPORTUNITY_INSTANCE = 'primitive/_func/v_koola_opportunity_instance_select_by_id';
    public static INSTANCE_PREVIEW_UPDATE = 'primitive/_func/v_koola_preview_publish_update';

    //Cart Details
    public static INSERT_CART = 'primitive/_func/v_koola_cart_checkout';
    public static DELETE_CART = 'primitive/_func/v_koola_cart_checkout_update';
    public static SEARCH_CART = 'primitive/_func/v_koola_cart_checkout_search';

    //Search Get
    public static GET_SESSION_DETAILS = "primitive/_func/v_koola_opportunity_instance_select_all";
    public static SEARCH_FILTER = "primitive/_func/v_koola_opportunity_instance_search_working";



    public static currentUser = JSON.parse(localStorage.getItem("currentUser"));

    public static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Auth-key': 'petsApi',
            'Access-Control-Allow-Origin': '*'
        })
    };
}