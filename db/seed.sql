-- -------------------------------------------------------------
-- TablePlus 5.8.4(532)
--
-- https://tableplus.com/
--
-- Database: dev-database
-- Generation Time: 2024-02-06 21:51:25.3760
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."Subscription";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."SubscriptionStatus";
CREATE TYPE "public"."SubscriptionStatus" AS ENUM ('TRIALING', 'ACTIVE', 'PAUSED', 'CANCELED', 'PAST_DUE', 'UNPAID', 'INCOMPLETE', 'EXPIRED');

-- Table Definition
CREATE TABLE "public"."Subscription" (
    "id" text NOT NULL,
    "team_id" text NOT NULL,
    "customer_id" text NOT NULL,
    "status" "public"."SubscriptionStatus" NOT NULL,
    "plan_id" text NOT NULL,
    "variant_id" text NOT NULL,
    "next_payment_date" timestamp(3),
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."Team";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Team" (
    "id" text NOT NULL,
    "name" text NOT NULL,
    "slug" text NOT NULL UNIQUE,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."TeamInvitation";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.


CREATE TYPE "public"."TeamMemberRole" AS ENUM ('MEMBER', 'OWNER');

-- Table Definition
CREATE TABLE "public"."TeamInvitation" (
    "id" text NOT NULL,
    "team_id" text NOT NULL,
    "email" text NOT NULL,
    "role" "public"."TeamMemberRole" NOT NULL DEFAULT 'MEMBER'::"TeamMemberRole",
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."TeamMembership";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.



-- Table Definition
CREATE TABLE "public"."TeamMembership" (
    "id" text NOT NULL,
    "team_id" text NOT NULL,
    "user_id" text NOT NULL,
    "role" "public"."TeamMemberRole" NOT NULL DEFAULT 'MEMBER'::"TeamMemberRole",
    "is_creator" bool NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."User";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."UserRole";
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- Table Definition
CREATE TABLE "public"."User" (
    "id" text NOT NULL,
    "email" text NOT NULL,
    "email_verified" bool NOT NULL DEFAULT false,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER'::"UserRole",
    "name" text,
    "avatar_url" text,
    "github_username" text,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."UserKey";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."UserKey" (
    "id" text NOT NULL,
    "hashed_password" text,
    "user_id" text NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."UserOneTimePassword";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."UserOneTimePasswordType";
CREATE TYPE "public"."UserOneTimePasswordType" AS ENUM ('SIGNUP', 'LOGIN', 'PASSWORD_RESET');

-- Table Definition
CREATE TABLE "public"."UserOneTimePassword" (
    "id" text NOT NULL,
    "user_id" text NOT NULL,
    "code" text NOT NULL,
    "type" "public"."UserOneTimePasswordType" NOT NULL,
    "identifier" text NOT NULL,
    "expires" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."UserSession";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."UserSession" (
    "id" text NOT NULL,
    "user_id" text NOT NULL,
    "active_expires" int8 NOT NULL,
    "idle_expires" int8 NOT NULL,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."UserVerificationToken";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."UserVerificationToken" (
    "id" text NOT NULL,
    "user_id" text NOT NULL,
    "token" text NOT NULL,
    "expires" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."Team" ("id", "name", "slug") VALUES
('cls19h8300004xu54pteybx37', 'Hatch Head', 'hatch-head'),
('cls40wn240000xu1a5fuaez1l', 'tinka accounting', 'tinka-accounting'),
('cls46ixr60000xugeb99v1nyj', 'tinka 2', 'tinka-2');

INSERT INTO "public"."TeamMembership" ("id", "team_id", "user_id", "role", "is_creator") VALUES
('cls19h8300006xu546nvqbxuu', 'cls19h8300004xu54pteybx37', 'fdnvn6t7llofule', 'OWNER', 't'),
('cls1tp11k0003xu0ay8f71mun', 'cls19h8300004xu54pteybx37', 'q4dm0vw08iju3ld', 'MEMBER', 'f'),
('cls40wn240002xu1aqafkneee', 'cls40wn240000xu1a5fuaez1l', 'djh6qvqyxyg002a', 'OWNER', 't'),
('cls46ixr60002xugewgwpmwny', 'cls46ixr60000xugeb99v1nyj', 'djh6qvqyxyg002a', 'OWNER', 't');

INSERT INTO "public"."User" ("id", "email", "email_verified", "role", "name", "avatar_url", "github_username") VALUES
('djh6qvqyxyg002a', 'andrew+tinka@hatchhead.co', 'f', 'USER', 'Ryan Tinka', NULL, NULL),
('fdnvn6t7llofule', 'andrew@hatchhead.co', 'f', 'USER', 'Super Dupers', NULL, NULL),
('q4dm0vw08iju3ld', 'andrew+1@hatchhead.co', 'f', 'USER', 'User One', NULL, NULL);

INSERT INTO "public"."UserKey" ("id", "hashed_password", "user_id") VALUES
('email:andrew+1@hatchhead.co', 's2:i9ouaelnti7vhigh:8dccf8d240be88dd5bf47e13824b95089728007ce04239aeb7a7d790481488ea42ea39023b2adaf5322a94e257de048d2e93adf9ee8cb166c87adc6614da584c', 'q4dm0vw08iju3ld'),
('email:andrew@hatchhead.co', 's2:mkw7le56d2lhcfgm:011cd60af1f46e5bf10fa768049ddde4c8882863353b301f64d47dd0a4ca78f00de10d4e1a1a18bbcca1828d9d89f627b52f9cfa08b7a44cb0038e3b2e1a6d36', 'fdnvn6t7llofule'),
('email:andrew+tinka@hatchhead.co', 's2:dixn5qzc7qm2k6fc:2a1d98a1f2c3ae839875d7334fc16d7a950bd5cc734b7b153a2076d3f5fdd9bf81f858d3e2d69e52d07b1f6b71709e1ed1b08a11b6c81f7a1e6d3c5a2521200b', 'djh6qvqyxyg002a');

INSERT INTO "public"."UserOneTimePassword" ("id", "user_id", "code", "type", "identifier", "expires") VALUES
('cls19cypt0003xu548etcv7e3', 'fdnvn6t7llofule', '927314', 'SIGNUP', 'andrew@hatchhead.co', '2024-01-31 05:58:59.009'),
('cls19yghg000gxu548p55pwfj', 'q4dm0vw08iju3ld', '002332', 'SIGNUP', 'andrew+1@hatchhead.co', '2024-01-31 06:15:41.812'),
('cls3zs0ij0003xuu663uvx6ur', 'djh6qvqyxyg002a', '748997', 'SIGNUP', 'andrew+tinka@hatchhead.co', '2024-02-02 03:54:03.547');

INSERT INTO "public"."UserSession" ("id", "user_id", "active_expires", "idle_expires") VALUES
('24mkac9c1pm2r1qgeyvclunh1tel00ejz9l5dxgs', 'fdnvn6t7llofule', 1707274231504, 1708483831504),
('2qbtqzyosvre6hs3pf8zb5w9jp7rdun97l04xu3e', 'q4dm0vw08iju3ld', 1706760941806, 1707970541806),
('2zb88yesp15cj7i3vsw27gnzy5lfiucta65obg1a', 'fdnvn6t7llofule', 1707275430503, 1708485030503),
('3jdwhfhrhn2eaelicde7c1r904l4z1hx74d1i8gv', 'djh6qvqyxyg002a', 1707263776080, 1708473376080),
('46bvb8gzmkov8mwqsv74xzpxz9e6ndpky2m6ryuf', 'fdnvn6t7llofule', 1707273066963, 1708482666963),
('6ooeq0m8znqhzbkjk1vmluaczkuosrqcxcfwevy4', 'fdnvn6t7llofule', 1707274309067, 1708483909067),
('779b6di4wrqj086kl1ivjgp9z1nsfwal1wojv01n', 'fdnvn6t7llofule', 1707272135977, 1708481735977),
('7oso8bzooa4ka4i7t20n1pxy0yw9ynuz5pkpsbp5', 'fdnvn6t7llofule', 1707274359513, 1708483959513),
('874flyo9m9yk4e69xsklsnno46q8jdvjxkbe7euc', 'fdnvn6t7llofule', 1707276155739, 1708485755739),
('9tdv75y7oqy5npr2cy7eerj1m6mg74830uqhsp08', 'fdnvn6t7llofule', 1707276675650, 1708486275650),
('a6ulbhcn87tl86ilx7abg3o4xehdd5diznq2025e', 'fdnvn6t7llofule', 1707276470602, 1708486070602),
('bk95zbf388h3ysah8txn0ynqdbphbwxv2lof2cvj', 'fdnvn6t7llofule', 1707273831354, 1708483431354),
('da96rxshja6v695ey3e72go0xm9tb0fgwfa5fcra', 'fdnvn6t7llofule', 1706760101662, 1707969701662),
('detn3qgb9633d8h0q8yb8dq2h8wh85pwruduefk1', 'fdnvn6t7llofule', 1707272796046, 1708482396046),
('djisq9vwgcaxowy2zyei8cickpd5sq7g0f3jcjd7', 'fdnvn6t7llofule', 1707273935703, 1708483535703),
('f9ahbg1iyqdf1d7kfdu22mjw3wnha5db62r2jcaa', 'fdnvn6t7llofule', 1707275061034, 1708484661034),
('flsg9p52nw20zisyerxxackjtba4xvilixslqlhd', 'fdnvn6t7llofule', 1707274042366, 1708483642366),
('h6lw643ebu4ho1ko0ldeo7vsasr7renxt8cpgnui', 'fdnvn6t7llofule', 1707272849035, 1708482449035),
('i5sxtoayqqm2jhobzvjjv9xviib27tkvu2od09vc', 'fdnvn6t7llofule', 1707275265204, 1708484865204),
('ivyh8id3fct2too1w4e57q0h88wdlb47rz4qt57v', 'fdnvn6t7llofule', 1707273757452, 1708483357452),
('julak5zk6apvzkjzx0fpv5dyx46wbpfbcjr4ysbp', 'fdnvn6t7llofule', 1707276947050, 1708486547050),
('k9i1ghk534ufe5oya2m1k3766ogqxouhccwfvua3', 'fdnvn6t7llofule', 1707275658353, 1708485258353),
('kjmfu2ke2xxtcjfbspij9we2u6ufxcwnm2qkz5r8', 'fdnvn6t7llofule', 1707274084122, 1708483684122),
('kxt6bb5cchufjnry7wc1xsa887jiyyus5ubiepnr', 'fdnvn6t7llofule', 1707276344114, 1708485944114),
('l6yzcpav0x4zoly09hlo4ajvevwud253qleotz9n', 'fdnvn6t7llofule', 1707274185763, 1708483785763),
('l8k8q5x6xvteq1e3ycrhvtdq18p9s008nnuk4lbv', 'q4dm0vw08iju3ld', 1706938725881, 1708148325881),
('m2sy8nvby4vgazmj7u8c3cv1rrchn0rbl1aps6rj', 'fdnvn6t7llofule', 1707274445354, 1708484045354),
('mmhm3pbpe6o9dhck1om48sm5dsw6qgkdfdjuvyx3', 'fdnvn6t7llofule', 1707275910390, 1708485510390),
('o4o49p2ba426gbsdbuzefh2e2chry7l8cs93t5tj', 'fdnvn6t7llofule', 1707275946931, 1708485546931),
('qih9j7f39zoobkff100etolen3n8hwplx0care8v', 'fdnvn6t7llofule', 1707275933329, 1708485533329),
('s1um046vlqazj4wb3i2kfluwce4e6j3cheir99pf', 'fdnvn6t7llofule', 1707275390764, 1708484990764),
('tx2i0yf7z7mncupupkhbhtxebexz2r0yst7xs16d', 'fdnvn6t7llofule', 1707276809666, 1708486409666),
('udqsh3rtnr41ej6k0fu84w6fnhfnb9bysl4x4dxf', 'fdnvn6t7llofule', 1707275505045, 1708485105045),
('ugnz8xierxbbbuqtomo7n62umira5evs2megwn2w', 'fdnvn6t7llofule', 1707272681192, 1708482281192),
('v9ecgf3gmiptgrn83lkvmq2tdj6znjsace5xgei0', 'fdnvn6t7llofule', 1707273980621, 1708483580621),
('zdq7k5jp37wf6vs7l9fd6qeyg8c6dr83idssopng', 'fdnvn6t7llofule', 1707272075793, 1708481675793),
('zh9uy2sf5om393beb1fr4cue20bz2ahzy1hgoy5p', 'fdnvn6t7llofule', 1707276400128, 1708486000128);

INSERT INTO "public"."UserVerificationToken" ("id", "user_id", "token", "expires") VALUES
('cls3zs0ih0001xuu6r8ix8n1v', 'djh6qvqyxyg002a', 'afs44vf1ub9mevaajvfr5z9z7gdtctbc0h49d7mrbluzibsy20ml47xxcbsrn6f', '2024-02-02 03:54:03.544');

ALTER TABLE "public"."Subscription" ADD FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."TeamInvitation" ADD FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."TeamMembership" ADD FOREIGN KEY ("team_id") REFERENCES "public"."Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."TeamMembership" ADD FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserKey" ADD FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserOneTimePassword" ADD FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserSession" ADD FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."UserVerificationToken" ADD FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
