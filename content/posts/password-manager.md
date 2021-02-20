---
title: "Password manager"
description: "Password manager"
keywords: password,manager,bitwarden,lastpass,keepass
date: 2021-02-18T17:57:26+01:00
---

## Password manager

I would recommend Bitwarden and it would be best to also use an authenticator.

* [Bitwarden](https://bitwarden.com/) (Free/Premium)
* [LastPass](https://lastpass.com/) (Free/Premium)
* [KeePass](https://keepass.info/) (Free)

### Authenticator

Authy or Google mostly suitable for the first access.

Bitwarden Authenticator (TOTP) is only available for Premium.

* [Authy](https://authy.com/) (Free)
* [Google Authentificator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) (Free)
* [LastPass Authentificator](https://lastpass.com/auth/) (Free)
* [Bitwarden Authenticator (TOTP)](https://bitwarden.com/help/article/authenticator-keys/) (Premium)

### Switching off the password manager in Firefox

Firefox > Settings > Privacy & Security > Credentials and Passwords
* Asking whether access data and passwords for websites should be saved = no

## I want to know more

Why a password manager?

Some remember the passwords with a simple **code key**, which is very nonsensical, because most of them forget it anyway.
Above all, you can crack such passwords in seconds.

The next ones write down the passwords at least on **paper**.
Or on the next paper, a line here, changed there, what illegible writing.
Damn the paper is at home ...

Since you have now experienced enough analog frustration, you take an **office package**.
So a **writing program like Word** or **Wordpad** or, for the clever ones, a **spreadsheet like Excel**.
Now everything has been typed neatly, but either confused, no space, printer does not spit it out cleanly, etc.

The real problem with the Office programs is the **spelling correction** and **automatic input of content**.
This will break your passwords if you are not careful.

The only thing that works would be a pure "**Text editor**".
The one who cannot display bold text.

Until then, however, everything can be read in plain text.
Where most people use a **USB stick/hard drive** so that it is not directly on the PC.
Once the USB stick is not ejected correctly and pulled out too early, the USB stick is broken and the password list is gone.
**The digital frustration is here at the latest now.**

The **browser** itself has an integrated password manager and is already used by most.
But this is often a bit rudimentary and has its problems.

### Why not just a password manager?

The only thing you can really do in a practical way is to use a password manager, which encrypts all data in the container.
**For example Bitwarden, LastPass or KeePass.**

In principle you have a **master password**, which you have to remember so that you can open your safe.
Have you forgotten the master password since you literally fucked, because all passwords are not decipherable, so they are bad.
That's why you write down this one password and never forget it!

**KeePass 1 + 2** is the local variant, so you have to make sure that you keep the file well.
But it is also annoying because it is not exactly user-friendly and has its problems with synchronization.

**Bitwarden** and **LastPass**, is the online variant. With which you can almost always have passwords filled out skillfully with an addon.
In addition, there are apps on the smartphone, whatever you always have with you.
With an authenticator you can additionally protect access, which I would recommend.
That’s comfortable!

Ultimately, I personally decided on Bitwarden because I find it much more pleasant.
I've been using Password Manager for over 20 years and have never had to print out a password.
If anyone wants to do that, I made a script for Bitwarden to make it look nice.
Lastpass can do it too, it just looks like shit.

{{< markdown/button url="posts/bitwarden-to-pdf.html" class="btn-primary mb-2">}}
<i class="fas fa-arrow-right"></i> Convert Bitwarten JSON to PDF
{{< /markdown/button >}}

What you decide in the end is your choice. After all, you have to deal with it.
