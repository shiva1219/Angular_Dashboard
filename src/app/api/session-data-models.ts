//Base offering classes 

export class SurfaceQuality {
    surface_quality_id: number;
    surface_quality: string;
    flag: string;
}

export class ConsumerExpert {
    consumer_expertise_id: number;
    consumer_expertise: string;
    flag: string;
}

export class Pincode {
    pincode: number;
}

export class TagetAgeGroup {
    target_age_group_id: number;
    target_age_group: string;
    flag: string;
}

export class OfferingDetail {
    base_offering_id: number;
    service_provider_id: number;
    service_provider: string;
    cname: string;
    sp_narrative: string;
    opportunity_id: number;
    base_offering: string;
    description: string;
    commission?: any;
    frequency_of_offering: string;
    surface_quality_id: number;
    corporate_licenced: boolean;
    minimum_consumer_expertise_id: number;
    gender: string;
    range_min: number;
    range_max: number;
    currency_id: number;
    commission_type_id?: any;
    provider_offering_id: number;
    number_of_credits: number;
    auto_resubscribe_frequency: string;
    minimum_commitment: string;
    price: number;
    value: number;
    offer_start_date: string;
    offer_end_date: string;
    surface_quality: SurfaceQuality[];
    consumer_expert: ConsumerExpert[];
    pincode: Pincode[];
    taget_age_group: TagetAgeGroup[];
}

export class BaseOfferings {
    return_message: string;
    return_code: number;
    ui_message_disp_code: string;
    offering_details: OfferingDetail[];
}

//venue select Details

export class VenueChildDetail {
    venue_id: number;
    parent_venue_id: number;
    venue: string;
    gps_location?: any;
    surface_type_id: number;
    surface_quality_id: number;
    address_id: number;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
}

export class Amenity {
    amenity_id: number;
    type_of_amenity: string;
    amenity_image_url?: string;
}

export class VenueDetail {
    venue_id: number;
    parent_venue_id?: any;
    venue: string;
    gps_location?: any;
    surface_type_id: number;
    surface_quality_id: number;
    address_id: number;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    venue_child_details: VenueChildDetail[];
    amenities: Amenity[];
}

export class VenueMain {
    return_message: string;
    return_code: number;
    ui_message_disp_code: string;
    venue_details: VenueDetail[];
}

/* === sessionDetails === */

export class SessionDetails {
    return_message: string;
    return_code: number;
    ui_message_disp_code: string;
    opportunity_instance_details: OpportunityInstanceDetail[];
}

export class TargetAgeGroup {
    target_age_group_id: number;
    target_age_group: string;
}

export class Venue {
    venue_id: number;
    venue: string;
    parent_venue_id?: number;
}

export class Image {
    image_id: number;
    image_name: string;
    image_url: string;
}

export class Day {
    session_type_id: number;
    start_date: string;
    completion_date: string;
}

export class OpportunityInstanceDetail {
    opportunity_instance_id: number;
    opportunity_instance: string = "";
    base_offering_id: number;
    service_provider_id: any;
    service_provider: string;
    cname: string;
    session_start_time: string;
    session_completion_time: string;
    available_slots: number;
    approval_type_id: number;
    created_by_spr_id?: any;
    opportunity_id: number;
    special_note: string;
    status: string;
    price: number;
    gender: String;
    session_type_id: string;
    amenity: Amenity[];
    target_age_group: TargetAgeGroup[];
    consumer_expert: ConsumerExpert[];
    surface_quality: SurfaceQuality[];
    sp_narrative?: any;
    coaching_by: string;
    venue: Venue[];
    image: Image[];
    days: Day[];
}






