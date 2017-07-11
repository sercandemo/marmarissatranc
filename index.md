---
---
<div>
  {% for post in site.posts %}
    <p>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.content | strip_html | truncatewords: 50 }}
    </p>
  {% endfor %}
</div>
