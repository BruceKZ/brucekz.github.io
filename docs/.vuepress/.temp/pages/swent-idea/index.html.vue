<template><div><h2 id="doglink" tabindex="-1"><a class="header-anchor" href="#doglink"><span>DogLink</span></a></h2>
<h3 id="pitch" tabindex="-1"><a class="header-anchor" href="#pitch"><span>Pitch</span></a></h3>
<p>Many dog owners struggle to give their dogs enough companionship and daily walks due to busy work schedules or health constraints. At the same time, many dog lovers are unable to keep dogs themselves because of housing rules or financial limits, but would love the chance to spend time with them. <strong>DogLink</strong> bridges this gap by connecting dog owners with dog enthusiasts who can help with walking, playtime, and companionship.</p>
<p>Beyond that, DogLink provides a dedicated community where dog owners can share posts and videos, access reliable veterinary information, and keep track of their dogs’ health records. It creates a trusted space for social connection, practical support, and better care for dogs.</p>
<h3 id="features" tabindex="-1"><a class="header-anchor" href="#features"><span>Features</span></a></h3>
<ol>
<li>
<p><strong>Dog-walking and playtime matching</strong>: Connect owners with local dog lovers for walking, play visits, or group dog-walking events.</p>
</li>
<li>
<p><strong>Dog community feed</strong>: Share photos and short videos, follow other owners, and engage socially through likes and comments.</p>
</li>
<li>
<p><strong>Veterinary services</strong>:</p>
<ul>
<li>Online consultations with partnered vets (using camera &amp; microphone)</li>
<li>Nearby veterinary clinic map with navigation</li>
<li>Ratings and reviews of vets and clinics</li>
</ul>
</li>
<li>
<p><strong>Dog health records (offline-ready)</strong>: Track vaccination, deworming, and check-up schedules with built-in offline reminders.</p>
</li>
<li>
<p><strong>Dog activities &amp; meetups</strong>: Organize or join local group walks, meetups, or dog-friendly events.</p>
</li>
</ol>
<h3 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements"><span>Requirements</span></a></h3>
<ul>
<li>
<p><strong>Split App Model:</strong></p>
<ul>
<li>Local storage: dog health records, offline reminders, cached posts</li>
<li>Cloud storage (Firebase): accounts, posts, walking services, clinic data</li>
</ul>
</li>
<li>
<p><strong>User Support:</strong></p>
<ul>
<li>Two user types: dog owners and dog lovers</li>
<li>Dog profiles, personal accounts, walking/playtime history, social connections</li>
</ul>
</li>
<li>
<p><strong>Sensor Use:</strong></p>
<ul>
<li><strong>GPS</strong>: Track dog-walking routes and locate nearby clinics/events</li>
<li><strong>Camera &amp; Microphone</strong>: Capture photos/videos for sharing; enable online vet consultations</li>
<li><strong>Accelerometer</strong>: Combine with GPS for dog-walk activity reports</li>
</ul>
</li>
<li>
<p><strong>Offline Mode:</strong></p>
<ul>
<li><strong>Fully offline</strong>: Dog health records with reminders</li>
<li>Cached access: previously viewed posts and clinic information</li>
<li>Offline dog-walk tracking stored locally until synced online</li>
<li>Offline drafts: save posts or consultation questions for later publishing</li>
</ul>
</li>
</ul>
</div></template>


