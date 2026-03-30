import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  // Initialize the authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Reservation = {
    id : Nat;
    guestName : Text;
    date : Text;
    time : Text;
    numberOfGuests : Nat;
    specialRequests : Text;
    submittedAt : Time.Time;
  };

  module Reservation {
    public func compare(r1 : Reservation, r2 : Reservation) : Order.Order {
      Nat.compare(r1.id, r2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  let reservations = Map.empty<Nat, Reservation>();
  var nextReservationId = 0;
  let userProfiles = Map.empty<Principal, UserProfile>();

  public type SubmitReservationRequest = {
    guestName : Text;
    date : Text;
    time : Text;
    numberOfGuests : Nat;
    specialRequests : Text;
  };

  public query ({ caller }) func debugGetIsAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Reservation Management
  public shared ({ caller }) func submitReservation(request : SubmitReservationRequest) : async Nat {
    // Anyone can submit a reservation (guests, users, admins)
    if (Text.equal(request.guestName, "")) {
      Runtime.trap("Guest name cannot be empty");
    };
    if (Text.equal(request.date, "")) {
      Runtime.trap("Date cannot be empty");
    };
    if (Text.equal(request.time, "")) {
      Runtime.trap("Time cannot be empty");
    };
    if (request.numberOfGuests == 0) {
      Runtime.trap("Number of guests must be greater than 0");
    };

    let reservation : Reservation = {
      id = nextReservationId;
      guestName = request.guestName;
      date = request.date;
      time = request.time;
      numberOfGuests = request.numberOfGuests;
      specialRequests = request.specialRequests;
      submittedAt = Time.now();
    };

    reservations.add(nextReservationId, reservation);
    nextReservationId += 1;
    reservation.id;
  };

  public query ({ caller }) func getAllReservations() : async [Reservation] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all reservations");
    };
    reservations.values().toArray().sort();
  };
};
