---
title: Turnuvalar
permalink: turnuvalar/index.html
layout: default
---

<table class="table table-bordered table-striped">
<tbody>
<tr>
  <th>Turnuva Adı</th>
  <th>Tarih</th>
</tr>

{% assign myfiles = site.static_files | sort: 'name' | reverse %}

{% for myfile in myfiles %}

{% if myfile.path contains 'data/turnuvalar/' %}
<tr>
<td class="col-md-8"><a href="{{ site.github.url }}/turnuvalar/{{ myfile.basename }}" > {{ site.data.turnuvalar[myfile.basename].adi }} </a></td>
<td class="col-md-4">{{ site.data.turnuvalar[myfile.basename].baslama-tarihi }}</td>
</tr>
{% endif %}

{% endfor %}

</tbody>
</table>
