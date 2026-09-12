# Features

## Must Have
| Feature | User Capability | Complexity | Priority Justification |
|---|---|---|---|
| Auth (signup/login/logout) | Create account, sign in securely | Moderate | Foundational — nothing else works without identity |
| Create/view subreddits | Start & browse communities | Simple/Moderate | Core organizing unit of the app |
| Create/edit/delete threads | Post content in a subreddit | Simple | Primary content-creation loop |
| Thread feed (per-sub + global) | Browse posts | Simple | Core consumption loop |
| Upvote/downvote threads (1 vote/user) | Rank content | Moderate | Signature Reddit mechanic; needs vote-tracking to prevent abuse |
| Comment on threads (flat) | Discuss content | Moderate | "Discuss" is half the product's stated purpose |
| Basic keyword search | Find threads/subreddits | Moderate | Needed for discoverability as content grows |

## Should Have
| Feature | User Capability | Complexity | Priority Justification |
|---|---|---|---|
| Nested comment replies | Threaded discussions | Complex | Big UX upgrade, but flat comments already deliver core value |
| Vote on comments | Rank replies | Moderate | Extends existing vote model, non-blocking for MVP |
| Subscribe to subreddits + personalized feed | Follow communities | Simple/Moderate | Boosts retention, but browse-all works at launch |
| Sort (hot/new/top/controversial) | Control feed ordering | Moderate | Matters once volume scales |
| User karma | Track reputation | Moderate | Motivational, derivable from existing vote data |
| Pagination/infinite scroll | Handle large feeds | Moderate | Performance concern once seed data grows |
| Edit/delete own comments | Manage own content | Simple | Parity with thread editing |
| Basic moderation (sub owner removes content) | Keep community healthy | Moderate | Needed for health, not for a functional demo |
| Notifications (replies/mentions) | Stay engaged | Complex | Strong retention driver but needs extra infra |
