# RSVP Next.js frontend project
This is a web application that allows guests to confirm their attendance to a small event by submitting only their first name, last name, and menu preference. Also, the event administrator can manage attendees through a protected admin panel, which is only accessible to authenticated users.
The idea is to make it simpler for the attendee and the event administrator.

**It is designed for small events like weddings, birthdays, etc**

## How does it work?
- **Attending alone:**
    The user simply submits their name, lastname, menu and email address. That's it.

- **Attending with a group:**
    The group leader submits name, lastname, menu and email address. Then, the companions
    submit their own name, lastname and menu and select the leader's name from the dropdown list. Done!.


## Stack
### Frontend
- Next.js
- ShadCN
- Tailwind

### Backend
- FastAPI
- Supabase

🔗 The backend for this project can be found here:
https://github.com/gon2410/rsvp_backend