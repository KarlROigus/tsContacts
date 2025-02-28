CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL
);

CREATE TABLE contacttypes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(128) NOT NULL
);

CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    value VARCHAR(128) NOT NULL,
    person_id UUID NOT NULL,
    contacttype_id UUID NOT NULL,
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE,
    FOREIGN KEY (contacttype_id) REFERENCES contacttypes(id) ON DELETE CASCADE
);
