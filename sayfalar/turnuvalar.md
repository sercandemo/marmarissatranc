---
title: Turnuvalar
permalink: turnuvalar/index.html
layout: default
---

<h3> Turnuvalar </h3>

{% assign myfiles = site.static_files | sort: 'name' | reverse %}
{% assign turnuva_sayisi = 0 %}

{%- for myfile in myfiles -%}

{%- if myfile.path contains 'data/turnuvalar/' -%}
{%- assign turnuva_sayisi = turnuva_sayisi | plus: 1 -%}
{%- endif -%}

{%- endfor -%}

<p>Bugüne kadar <strong> {{ turnuva_sayisi }} </strong> turnuva düzenlendi.</p>
<div class="row">

  <div class="col-md-9">
    <table class="table table-bordered table-striped">
    <tbody>
    <tr>
      <th>Tarih</th>
      <th>Turnuva Adı</th>
    </tr>

    {%- for myfile in myfiles -%}

    {%- if myfile.path contains 'data/turnuvalar/' -%}

    {% assign tarih = myfile.basename | split: '-' %}
    {% assign tarihs = tarih[0] | append: '-' | append: tarih[1] | append: '-' | append: tarih[2] %}

    <tr>
    <td class="col-md-4">
    {{ tarihs | date: "%-d" }}
    {% assign m = tarihs | date: "%-m" | minus: 1 %}
    {{ site.data.tr.months[m] }}
    {{ tarihs | date: "%Y" }}
    </td>
    <td class="col-md-8"><a href="{{ site.github.url }}/turnuvalar/{{ myfile.basename }}" > {{ site.data.turnuvalar[myfile.basename].adi }} </a></td>
    </tr>
    {%- endif -%}

    {%- endfor -%}

    </tbody>
    </table>
  </div>

  <div class="col-md-3">
    {% include sponsor.html %}
  </div>
</div>
