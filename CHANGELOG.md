
# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 2022-09-18

Task 2 + other improvements

### Added
- First working version of getData for task 2:
  - getData() reads post limit from config then decide how many pages and posts to return
  - For example:
    - 250 post limit will return 2 pages each 100 posts and third page 50 first posts
    - 1000 and above post limit will return 10 pages
    
    
- (Improvement) Add postId as second dimension because a user can have many posts
- (Improvement) Add page number as third dimension for better filtering
- (Improvement) Add more post limit options and change it to single select
- Add CHANGELOG.md

### Changed
- (Improvement) Extract metrics and dimensions to array for easier editing + adding functions to assign them to fields
- Move constants to constants.ts


### Fixed


## 2022-09-17 

Task 1 + small improvements to getSchema()

### Added
- First working version of getData for task 1:
  - Can request token from user's name and email in config and clientId from userProperties
  - Can query posts based on returned token and page number
  - Can return response mapped with request's schema
- Extract getFieldsFromRequest() and responseToRows() from getData() for later testings

### Changed
- Use 'ju16a6m81mhid5ue1z3v2g0uh' as test clientId for setCredentials()
- Remove hardcoded payload in registerToken()
- (Improvement) Extract getField() from getSchema() to reuse as request filter in getData

### Fixed

## 2022-09-12
Initial attempts to query posts

### Added
- Add registerToken.ts without using user's config
- Initial version of getData() with sample query of posts

### Changed

### Fixed

## 2022-09-11

### Added

### Changed
- Separate steps for yarn setup
- Move .clasp.json to correct place for pushing after yarn setup
### Fixed
